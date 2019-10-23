import BN from 'bn.js'
import { O } from 'ts-toolbelt'
import { GenericAccountId, u64 } from '@polkadot/types'

interface ISignatures {
    'query.token.balance': [string, GenericAccountId, u64, BN]
}

export type Endpoint = keyof ISignatures
export type EndpointWithRequest = keyof O.Filter<ISignatures, [null, ...any[]], 'implements->'>
export type EndpointWithoutRequest = Exclude<Endpoint, EndpointWithRequest>

export type Request<E extends Endpoint> = ISignatures[E][0]
export type ConvertedRequestForApi<E extends Endpoint> = ISignatures[E][1]
export type ApiResponse<E extends Endpoint> = ISignatures[E][2]
export type ConvertedResponse<E extends Endpoint> = ISignatures[E][3]

export type ToRequestConverter<E extends Endpoint> = (request: Request<E>) => ConvertedRequestForApi<E>
export type ToRequestConverters = {
    [E in EndpointWithRequest]: ToRequestConverter<E>
}

export type FromResponseConverters = {
    [E in Endpoint]: (response: ApiResponse<E>) => ConvertedResponse<E>;
  }