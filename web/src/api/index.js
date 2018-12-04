import auth from './modules/auth.api'
import accounts from './modules/accounts.api'
import budgets from './modules/budgets.api'
import items from './modules/items.api'
import transactions from './modules/transactions.api'

export default {
    ...auth,
    ...accounts,
    ...budgets,
    ...items,
    ...transactions,
}
