import * as React from 'react';
import * as Modal from 'react-modal';
import { observer } from 'mobx-react';
import { UserWarehouse } from '../domain/UserWarehouse';
import { MessageWarehouse } from '../domain/MessageWarehouse';

interface PropValues {
    userWarehouse: UserWarehouse;
    messageWarehouse: MessageWarehouse;
}

interface StateValues {
    isModalOpen: boolean;
}

@observer
class LoginComponent extends React.Component<PropValues, StateValues> {

    userName: string;
    password: string;
    modalStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)'
        }
    };
    modalTitle = 'Unable to Log In';
    modalDescription = 'The ID or Password is Invalid';

    constructor(props: PropValues) {
        super(props);
        this.state = {
            isModalOpen : false
        };
    }

    public render() {

        return (
            <div className="special-container">
                <div className="row">
                    <div>
                        <h1>Login</h1>
                    </div>
                </div>
                <div className="col-md-6 col-md-offset-3">
                    <div className="panel-body">
                        <form>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="userName"
                                    id="userName"
                                    className="form-control"
                                    placeholder="Username"             
                                    onBlur={event => this.userNameChanged(event)}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    className="form-control"
                                    placeholder="Password"
                                    onBlur={event => this.passwordChanged(event)}
                                />
                            </div>
                            <div className="row">
                                <input
                                    type="button"
                                    name="login-submit"
                                    id="login-submit"
                                    className="form-control btn btn-login"
                                    value="Log In"
                                    onClick={event => this.loginButtonClicked(event)}
                                />
                            </div>
                        </form>
                    </div>
                </div>
                <div>
                    <Modal
                        isOpen={this.state.isModalOpen}
                        onRequestClose={this.closeModal}
                        style={this.modalStyles}
                        contentLabel="Example Modal"
                        parentSelector={() => document.body}
                    >
                        <h2>{this.modalTitle}</h2>
                        <div>{this.modalDescription}</div>
                        <button onClick={this.closeModal}>close</button>
                    </Modal>
                </div>
            </div>
        );
    }

    loginButtonClicked(event: React.FormEvent<HTMLInputElement>) {

        let successfulLogin = this.props.userWarehouse.setLoggedInUser(this.userName, this.password);
        if ( successfulLogin ) {
            this.props.messageWarehouse.conversationPartnerChanged(this.props.userWarehouse.conversation);
        } else {
            this.setState({ isModalOpen: true });
        }
    }

    userNameChanged(event: React.FormEvent<HTMLInputElement>) {
        this.userName = event.currentTarget.value.trim();
    }

    passwordChanged(event: React.FormEvent<HTMLInputElement>) {
        this.password = event.currentTarget.value.trim();
    }

    closeModal = () => {
        this.setState({ isModalOpen: false });
    }
}

export default LoginComponent;
