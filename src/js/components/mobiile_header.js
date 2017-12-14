/**
 * @Date:   2017-12-05T13:41:36+08:00
 * @Email:  rosen_yang@sina.com
 * @Last modified time: 2017-12-14T20:51:19+08:00
 */
import React from 'react';
import {
    Row,
    Col,
    Form,
    Menu,
    Icon,
    Tabs,
    message,
    Input,
    Button,
    Modal
} from 'antd';
import {Link} from 'react-router';
/* 常量 */
const TabPane = Tabs.TabPane;
const SubMenu = Menu.SubMenu;
const FormItem = Form.Item;
const MenuItemGroup = Menu.ItemGroup;

class MobileHeader extends React.Component {
    constructor() {
        super();
        this.state = {
            current: 'top',
            modalVisible: false,
            action: 'login',
            hasLogined: false,
            userNickName: '',
            userId: 0
        }
    };
    //控制模态框显示
    setModalVisible(value) {
        this.setState({modalVisible: value});
    };
    handleClick(e) {
        if (e.key == "register") {
            this.setState({current: 'register'});
            this.setModalVisible(true);
        } else {
            this.setState({current: e.key});
        }
    };
    //登录 注册事件入口
    handleSubmit(e) {
        e.preventDefault();
        var myFetchOptions = {
            method: 'GET'
        };
        var formData = this.props.form.getFieldsValue();
        let url = "http://newsapi.gugujiankong.com/Handler.ashx?action=" + this.state.action + "&username=" + formData.userName + "&password=" + formData.password + "&r_username=" + formData.r_userName + "&r_password=" + formData.r_password + "&r_confirmPassword=" + formData.r_confirmPassword;
        fetch(url, myFetchOptions).then(response => response.json()).then(json => {
            this.setState({userNickName: json.NickUserName, userid: json.UserId});
            localStorage.userId = json.UserId;
            localStorage.userNickName = json.NickUserName;
        });
        if (this.state.action == "login") {
            this.setState({hasLogined: true});
            message.success('登录成功！');
        } else {
            message.success('注册成功！');
        }
        this.setModalVisible(false);
    };
    login() {
        this.setModalVisible(true);
    };
    //Tab切换登录/注册
    changeTab(key) {
        if (key === 1) {
            this.setState({action: 'login'});
        } else if (key === 2) {
            this.setState({action: 'register'})
        }
    };
    render() {
        let {getFieldProps} = this.props.form;
        const userShow = this.state.hasLogined
            ? <Link>
                    <Icon type="inbox"/>
                </Link>
            : <Icon type="setting" onClick={this.login.bind(this)}/>;
        return (<div id="mobileheader">
            <header>
                <img src='./src/images/logo.png' alt="logo"/>
                <span>React Nes</span>
                {userShow}
            </header>

            <Modal title="用户中心" wrapClassName="vertical-center-modal" visible={this.state.modalVisible} onCancel={() => this.setModalVisible(false)} onOk={() => this.setModalVisible(false)} okText="关闭">
                <Tabs type="card" onChange={this.changeTab.bind(this)}>
                    <TabPane tab="登录" key="1">
                        <Form mode="horizontal" onSubmit={this.handleSubmit.bind(this)}>
                            <FormItem label="帐户">
                                <Input placeholder="请输入您的帐号" {...getFieldProps('userName')}/>
                            </FormItem>
                            <FormItem label="密码">
                                <Input type="password" placeholder="请输入您的密码" {...getFieldProps('password')}/>
                            </FormItem>
                            <Button type="primary" htmlType="submit">登录</Button>
                        </Form>
                    </TabPane>
                    <TabPane tab="注册" key="2">
                        <Form mode="horizontal" onSubmit={this.handleSubmit.bind(this)}>
                            <FormItem label="帐户">
                                <Input placeholder="请输入您的帐号" {...getFieldProps('r_userName')}/>
                            </FormItem>
                            <FormItem label="密码">
                                <Input type="password" placeholder="请输入您的密码" {...getFieldProps('r_password')}/>
                            </FormItem>
                            <FormItem label="确认密码">
                                <Input type="password" placeholder="请再次输入您的密码" {...getFieldProps('r_confirm')}/>
                            </FormItem>
                            <Button type="primary" htmlType="submit">注册</Button>
                        </Form>
                    </TabPane>
                </Tabs>
            </Modal>
        </div>);
    }
}

export default MobileHeader = Form.create({})(MobileHeader);
