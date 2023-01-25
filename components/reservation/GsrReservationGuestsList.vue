<template>
  <div>
    <div class="grid grid-cols-1 w-full pt-6">
      <div class="flex flex-col w-full items-center py-4 border-t border-gray-200 cursor-pointer"
           @click="onElementClick(item)"
           v-for="(item, index) in reservation.guests" :key="index">
        <div class="flex flex-row items-center justify-between w-full">
          <div class="flex flex-row items-center space-x-2">
            <svg-icon name="profile-circle-bold" class="h-4 w-4"/>
            <span>{{ item.name }} {{ item.surname }}</span>
          </div>
          <div class="flex flex-row justify-center space-x-4">
            <svg-icon @click.stop="onDeleteRow(item)" name="trash" class="h-4 w-4"/>
            <svg-icon name="arrow-right" class="h-4 w-4"/>
          </div>
        </div>
        <div class="flex flex-row w-full pt-2" v-if="item.document">
          <div class="bg-gray-50 rounded-full p-1 px-2 border border-gray-400 text-xs">{{ item.document.file_name }}</div>
        </div>
      </div>
    </div>
    <div class="flex flex-row justify-end border-t border-gray-200 pt-4">
      <GsrButton @click="onAddRow">
        {{ $t('common.add') }}
      </GsrButton>
    </div>
    <!--    Guest form-->
    <GsrDialog
      :title="form.id ? $t('common.edit_guest'):$t('common.add_guest')"
      :opened="isDialogOpen"
      no-footer
      :loading="isLoading"
      @close="onDialogClose"
    >
      <GsrReservationGuestForm v-model="form" :is-loading="isLoading" @submit="onSave"/>
    </GsrDialog>
    <!--    Delete guest-->
    <GsrDialog
      :title="$t('common.delete_guest')"
      :opened="isDeleteDialogOpen"
      :button-title="$t('common.delete_guest')"
      @close="isDeleteDialogOpen = false;selectedItem={}"
      :loading="isLoading"
      @confirm="onDelete"
    >
      <span>{{ $t('common.delete_guest_message') }}</span>
    </GsrDialog>
  </div>
</template>

<script>
export default {
  name: "GsrReservationGuestsList",
  components: {
    GsrReservationGuestForm: () => import('@/components/forms/GsrReservationGuestForm'),
    GsrDialog: () => import('@/components/common/GsrDialog'),
    GsrButton: () => import('@/components/common/GsrButton'),
  },
  props: {
    reservation: {
      type: Object,
      default: () => []
    }
  },
  data() {
    return {
      isLoading: false,
      isDialogOpen: false,
      isDeleteDialogOpen: false,
      form: {
        reservation_id: null,
        name: '',
        surname: '',
        email: '',
        age: '',
        address: '',
        document: null
      },
      pristineForm: {},
      selectedItem: {}
    }
  },
  mounted() {
    this.pristineForm = this.form
    if (this.reservation) {
      this.form.reservation_id = this.reservation.id
    }
  },
  methods: {
    /**
     * @desc on dialog close callback
     */
    onDialogClose() {
      this.isDialogOpen = false
    },
    /**
     * @desc On add row
     */
    onAddRow() {
      // Reset form for safety
      this.form = this.pristineForm
      this.isDialogOpen = true
    },
    /**
     * @desc On add row
     */
    onDeleteRow(item) {
      this.selectedItem = item
      this.isDeleteDialogOpen = true
    },
    /**
     * @desc on save callback
     */
    async onSave() {
      this.isLoading = true
      try {
        let dataObject = new FormData()
        Object.keys(this.form).forEach(key => {
          dataObject.append(key,this.form[key])
        });
        if (this.form.id) {
          await this.$services.reservations.updateReservationGuest(this.reservation.code, this.form.id, dataObject, this.$i18n.locale)
        } else {
          await this.$services.reservations.storeReservationGuest(this.reservation.code, dataObject, this.$i18n.locale)
        }
        this.$emit('updated')
        this.isDialogOpen = false
      } catch (e) {
        this.$toast.error(this.$t('error.generic'))
      } finally {
        this.isLoading = false
      }
    },
    /**
     * @desc on delete callback
     */
    async onDelete() {
      console.log('on delete')
      this.isLoading = true
      try {
        if (this.selectedItem && 'id' in this.selectedItem) {
          await this.$services.reservations.deleteReservationGuest(this.reservation.code, this.selectedItem.id, this.$i18n.locale)
        }
        this.selectedItem = {}
        this.$emit('updated')
        this.isDeleteDialogOpen = false
      } catch (e) {
        this.$toast.error(this.$t('error.generic'))
      } finally {
        this.isLoading = false
      }
    },
    /**
     * @desc On element click
     * @param item
     */
    onElementClick(item) {
      this.isDialogOpen = true
      if (this.form.age) {
        //this.form.age = parseInt(this.form.age)
      }
      this.form = item
    }
  }
}
</script>
