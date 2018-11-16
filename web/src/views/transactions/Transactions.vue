<template>
  <Dashboard>
      <template slot="header">
          <div>
              <router-link
                  :to="{ name: 'Transactions', params: { id: 'new' }}"
                  class="dashboard__header-button"
              >
                  New Transaction
              </router-link>
          </div>
      </template>
      <template slot="content">
          <Loader v-if="loading"/>
          <template v-else>
              <div>
                <div
                    v-for="transaction in transactions"
                    :key="transaction.id"
                    class="transaction__row"
                >
                    <div>
                        <b>Date</b> {{transaction.date}}
                        <b>Name</b> {{transaction.name}}
                        <b>Amount</b> {{transaction.amount}}
                        <b>Budget</b> {{transaction.budget}}
                    </div>
                    <button>Update</button>
                </div>
              </div>
          </template>
              <Modal
                  v-if="isModalOpen"
                  v-scroll-lock="isModalOpen"
                  :title="title"
                  @handleOnCloseModal="handleOnCloseModal"
              >
                  <TransactionsForm/>
              </Modal>
      </template>
  </Dashboard>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { get } from '@/utils'
import api from '@/api'
import Dashboard from '@/layouts/Dashboard'
import Loader from '@/components/Loader'
import Modal from '@/components/Modal'
import TransactionsForm from './components/TransactionsForm'

export default {
    name: 'Transactions',
    components: {
        Dashboard,
        Loader,
        Modal,
        TransactionsForm,
    },
    data: () => ({
        isModalOpen: false,
        loading: false,
        modalTransaction: null,
        title: 'Transactions',
    }),
    computed: {
        ...mapGetters(['transactions']),
    },
    async beforeRouteEnter(to, from, next) {
        const transactionId = get(() => to.params.id)
        if (transactionId) {
            if (transactionId === 'new') {
                next(vm => vm.openModal('New Transactions'))
            } else {
                try {
                    const res = await api.getTransaction(transactionId)
                    next(vm =>
                        vm.openModal(
                            'Update Transactions',
                            get(() => res.data),
                        ),
                    )
                } catch (err) {
                    console.log(err)
                }
            }
        } else {
            next(vm => vm.closeModal())
        }
    },
    async beforeRouteUpdate(to, from, next) {
        const transactionId = get(() => to.params.id)
        if (transactionId) {
            if (transactionId === 'new') {
                this.openModal('New Transaction')
            } else {
                try {
                    const res = await api.getTransactions(transactionId)
                    this.openModal('Update Transaction', get(() => res.data))
                } catch (err) {
                    console.log(err)
                }
            }
        } else {
            this.closeModal()
        }
        next()
    },
    async created() {
        this.loading = true
        try {
            await this.GET_TRANSACTIONS()
        } finally {
            this.loading = false
        }
    },
    methods: {
        ...mapActions(['GET_TRANSACTIONS']),
        handleOnCloseModal() {
            this.closeModal()
            this.$router.push({ name: 'Transactions' })
        },
        closeModal() {
            this.isModalOpen = false
            this.title = 'Transactions'
            this.modalTransaction = null
        },
        openModal(title, transaction = null) {
            this.isModalOpen = true
            this.title = title
            this.modalTransaction = transaction
        },
    },
    metaInfo() {
        return {
            title: this.title,
        }
    },
}
</script>


<style lang="scss" scoped>
@import '../../assets/styles/variables';
@import '../../assets/styles/functions';
@import '../../assets/styles/mixins';

.transaction__row {
    @include flex-row;
    align-items: center;
}
</style>
