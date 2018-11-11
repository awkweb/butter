import auth from './modules/auth.api'
import budgets from './modules/budgets.api'
import transactions from './modules/transactions.api'

export default {
    ...auth,
    ...budgets,
    ...transactions,
}
