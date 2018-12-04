import api from '../init'

export default {
    updateAccount: (accountId, data) =>
        api.patch(`accounts/${accountId}/`, data),
}
