import auth from './modules/auth.api'
import budgets from './modules/budgets.api'

export default {
    ...auth,
    ...budgets,
}
