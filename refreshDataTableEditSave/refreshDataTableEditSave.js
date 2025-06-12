import { LightningElement, wire, track } from 'lwc';
import contactList from '@salesforce/apex/ContactController.contactList';
import { updateRecord } from 'lightning/uiRecordApi';
import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const COLUMNS = [
    { label: 'First Name', fieldName: 'FirstName', editable: true },
    { label: 'Last Name', fieldName: 'LastName', editable: true },
    { label: 'Email', fieldName: 'Email', type: 'email', editable: true }
];

export default class RefreshDataTableEditSave extends LightningElement {
    columns = COLUMNS;
    draftValues = [];
    wiredContactResult;
    @track contacts;

    @wire(contactList)
    wiredContacts(result) {
        this.wiredContactResult = result;
        if (result.data) {
            this.contacts = result.data;
        } else if (result.error) {
            this.showToast('Error', 'Failed to fetch contacts', 'error');
        }
    }

    handleSave(event) {
        const recordsToUpdate = event.detail.draftValues.map(draft => {
            return { fields: { ...draft } }; // must include Id field
        });

        const promises = recordsToUpdate.map(record => updateRecord(record));

        Promise.all(promises)
            .then(() => {
                this.showToast('Success', 'Contacts updated successfully', 'success');
                this.draftValues = [];
                return refreshApex(this.wiredContactResult);
            })
            .catch(error => {
                this.showToast('Error', error.body?.message || 'Unknown error', 'error');
            });
    }

    showToast(title, message, variant) {
        this.dispatchEvent(new ShowToastEvent({ title, message, variant }));
    }
}
