import { createFormHook } from '@tanstack/react-form';
import { fieldContext, formContext } from './useFormContext';
import { TextField } from './text-field';
import { ErrorMessages } from './error-message';
import { FormRoot } from './form-root';
import { SubscribeButton } from './subscribe-button';
import { TextArea } from './text-area';
import { Switch } from './switch';
import { Checkbox } from './checkbox';
import { SelectController } from './select';
import { ComboboxField } from './combox-box';
import { MultiSelect } from './multi-select';
import { DatePicker } from './date-picker';
import { InputPassword } from './input-password';

export const { useAppForm } = createFormHook({
  fieldComponents: {
    TextField,
    TextArea,
    Switch,
    Checkbox,
    MultiSelect,
    DatePicker,
    Select: SelectController,
    InputPassword: InputPassword,
    Combobox: ComboboxField
  },
  formComponents: {
    Submit: SubscribeButton,
    Root: FormRoot,
    ErrorMessages
  },
  fieldContext,
  formContext
});
