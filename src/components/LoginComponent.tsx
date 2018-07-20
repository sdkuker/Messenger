import * as React from 'react';
import { observer } from 'mobx-react';
import { UserWarehouse } from '../domain/UserWarehouse';

interface PropValues {
    userWarehouse: UserWarehouse;
}

@observer
class LoginComponent extends React.Component<PropValues, {}> {

    userName: string;
    password: string;

    constructor(props: PropValues) {
        super(props);
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
                                    type="text"
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
            </div>
        );
    }

    loginButtonClicked(event: React.FormEvent<HTMLInputElement>) {

        let successfulLogin = this.props.userWarehouse.setLoggedInUser(this.userName, this.password);
        console.log('successful login? ' + successfulLogin);
    }

    userNameChanged(event: React.FormEvent<HTMLInputElement>) {
        this.userName = event.currentTarget.value;
    }

    passwordChanged(event: React.FormEvent<HTMLInputElement>) {
        this.password = event.currentTarget.value;
    }
}

export default LoginComponent;
