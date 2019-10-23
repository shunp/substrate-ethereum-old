function getErrorMsg(error: any): string {
    return error
    ? (error.message || String(error))
    : 'Unknown error'
}

export default getErrorMsg