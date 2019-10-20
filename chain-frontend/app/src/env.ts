
import { RegistryTypes } from '@polkadot/types/types'

interface INetworkConfig {
    id: number
    name: string
    rpcUrl: string
    contracts: {
        // bridge: string
        dai: string
    }
}
const ethNetworkConfigs: Record<number, INetworkConfig> = {
    "5777": {
        id: 5777,
        name: "Ganache",
        rpcUrl: "",
        contracts: {
            dai: "0xa48F15d704FE2E87Ea1d6b059829782B73b93fAD"
        }
    }
}

export const NETWORK_ID = 5777
export const ETH_NETWORK_CONFIG = ethNetworkConfigs[NETWORK_ID]
export const DEFAULT_DECIMALS = 18
export const SUBSTRATE_NODE_URL = 'ws://127.0.0.1:9944'
export const SUBSTRATE_NODE_CUSTOM_TYPES: RegistryTypes = {
}