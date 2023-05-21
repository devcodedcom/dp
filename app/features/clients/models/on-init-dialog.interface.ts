import { FormControl, FormGroup } from '@angular/forms';

export interface InitDialogForm {
  initForm(): void;
}

export interface DialogRowData {
  name: string;
  surname: string
  age: number;
  address: {
    city: string;
    street: string;
  }
}

export interface DialogData {
  type: 'add' | 'edit';
  rowData: DialogRowData;
}

interface ClientAddress {
  city: FormControl<string>;
  street: FormControl<string>;
}

export interface ClientForm {
  name: FormControl<string>;
  surname: FormControl<string>;
  age: FormControl<number>;
  address: FormGroup<ClientAddress>;
}
