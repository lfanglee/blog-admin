import { FormComponentProps } from 'antd/lib/form';
import { UpdateAdminParams } from '@/services/login';

interface StateProps {
    isLoading: boolean;
    name: string;
    slogan: string;
}

interface DispatchProps {
    updateAdmin(params: UpdateAdminParams): Promise<Ajax.AjaxResponse<UpdateAdminParams>>;
}

export type AccountProps = StateProps & DispatchProps & FormComponentProps;

export interface AccountState {
    confirmDirty: boolean;
}
