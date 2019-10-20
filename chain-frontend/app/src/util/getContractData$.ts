import { Observable, from, empty, merge } from 'rxjs'
import Contract from 'web3/eth/contract'

interface IOptions<IV, RV> {
    eventsForReload?: "none" | "all" | Array<any>
    reloadTrigger$?: Observable<any>
    args?: Array<string | number>
    convert?(value: IV): RV 
}

export function getContractData$<IV, RV>(
    contract: Contract,
    method: string,
    options: IOptions<IV, RV> = {}
): Observable<RV> {

    const {
        eventsForReload = "all",
        reloadTrigger$ = empty(),
        args = [],
        convert = identity
    } = options
    const load = async () => {
        const data = await contract.methods[method](...args).call()
        return convert(data)
    }
    const first$ = from(load())
    return merge(first$)
}

function identity(value: any) {
    return value;
}