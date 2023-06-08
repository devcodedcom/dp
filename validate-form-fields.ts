export function validateFormFields(form: FormGroup) {
  Object.keys(form.controls).forEach((field, i) => {
    if (form.get(field) instanceof FormGroup || form.get(field) instanceof FormArray) {
      validateFormFields(form.get(field) as FormGroup);
    } else {
      form.get(field)?.markAsDirty();
    }
  });
}


submit() {
    if (!this.isSubmitted) {
      this.isSubmitted = true;

      if (this.form.valid) {
        if (this.editMode && this.productId) {
          this.productService.updateProduct(this.productId, this.form.value).subscribe(() => {
            this.router.navigate(['dashboard', 'products']);
          }, (error) => {
            validateServerErrors(error, this.form);
            this.isSubmitted = false;
          });
        } else {
          this.productService.addProduct(this.form.value).subscribe(() => {
            this.router.navigate(['dashboard', 'products']);
          }, (error) => {
            validateServerErrors(error, this.form);
            this.isSubmitted = false;
          });
        }

      } else {
        validateFormFields(this.form);
        this.isSubmitted = false;
      }
    }
  }
