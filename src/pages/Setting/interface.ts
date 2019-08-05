import { RouteComponentProps } from 'react-router';

interface StateProps {

}

interface DispatchProps {

}

interface OwnProps {}

export type Props = StateProps & DispatchProps & OwnProps & RouteComponentProps

export interface State {
    inited: boolean;
    selectedKey: string;
}
