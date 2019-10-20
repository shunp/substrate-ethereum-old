import { fromResponseConverters } from './fromResponse';
import { switchMap, map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { ApiRx } from '@polkadot/api'
import { Endpoint, Request } from './types'
import { Codec } from '@polkadot/types/types'

function callPolkaApi<E extends Endpoint>(
    substrateApi: Observable<ApiRx>,
    endpoint: E,
    args?: Request<E>,
) {
    return substrateApi.pipe(switchMap(api => {
        const [area, section, method] = endpoint.split('.')
        let response: Observable<Codec>
        // TODO: add if condition
        const apiResponse = api.consts[section] && api.consts[section][method]
        response = new BehaviorSubject(apiResponse)
        return response.pipe(
            map(value => fromResponseConverters[endpoint](value as any))
        )
    }))
}
export { callPolkaApi }