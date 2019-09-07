import { FormComponentProps } from 'antd/lib/form';
import { UpdatePassword } from '@/services/login';

interface StateProps {
    isLoading: boolean;
    username: string;
}

interface DispatchProps {
    updatePassword(params: UpdatePassword): Promise<Ajax.AjaxResponse<null>>;
}

export type AccountProps = StateProps & DispatchProps & FormComponentProps;

export interface AccountState {
    confirmDirty: boolean;
}
