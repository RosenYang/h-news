/**
 * @Date:   2017-12-05T11:10:35+08:00
 * @Email:  rosen_yang@sina.com
 * @Last modified time: 2017-12-14T22:11:29+08:00
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

class PCHeader extends React.Component {
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
    componentWillMount() {
        if (localStorage.userId !== "") {
            this.setState({hasLogined: true});
            this.setState({userNickName: localStorage.NickUserName, userId: localStorage.userId});
        }
    }
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
    handleSubmit(e) {
        e.preventDefault();
        var myFetchOptions = {
            method: 'GET'
        };
        var formData = this.props.form.getFieldsValue();
        let url = "http://newsapi.gugujiankong.com/Handler.ashx?action=" + this.state.action + "&username=" + formData.userName + "&password=" + formData.password + "&r_username=" + formData.r_userName + "&r_password=" + formData.r_password + "&r_confirmPassword=" + formData.r_confirmPassword;
        fetch(url, myFetchOptions).then(response => response.json()).then(json => {
            this.setState({userNickName: json.NickUserName, userId: json.UserId});
            localStorage.userNickName = json.NickUserName;
            localStorage.userId = json.UserId;
        });
        if (this.state.action == "login") {
            this.setState({hasLogined: true});
            message.success('登录成功！');
        } else {
            message.success('注册成功！');
        }

        this.setModalVisible(false);
    };
    //Tab切换登录/注册
    changeTab(key) {
        if (key === "1") {
            this.setState({action: 'login'});
        } else if (key === "2") {
            this.setState({action: 'register'})
        }
    };
    //退出登录
    logout() {
        localStorage.userId = '';
        localStorage.userNickName = '';
        this.setState({hasLogined: false});
    }
    render() {
        let {getFieldProps} = this.props.form;
        // userShow 此变量用于可视化登录/注册按纽功用
        const userShow = this.state.hasLogined
            ? <Menu.Item key="logout" className="register">
                    <Button type="primary" htmlType="button">{this.state.userNickName}</Button>
                    &nbsp;&nbsp; d &nbsp;&nbsp;
                    <Button type="ghost" htmlType="button" onClick={this.logout.bind(this)}>退出</Button>
                </Menu.Item>
            : <Menu.Item key="register" class="register">
                <Icon type="appstore"/>注册/登录
            </Menu.Item>;

        return (<header>
            <Row>
                <Col span={2}></Col>
                <Col span={4}>
                    <a href="/" class="logo">
                        <img src="./src/images/logo.png" alt="logo"/>
                        <span>ReactNews</span>
                    </a>
                </Col>
                <Col span={16}>
                    <Menu mode="horizontal" onClick={this.handleClick.bind(this)} selectedKeys={[this.state.current]}>
                        <Menu.Item key="top">
                            <Icon type="appstore"/>头条
                        </Menu.Item>
                        <Menu.Item key="shehui">
                            <Icon type="appstore"/>社会
                        </Menu.Item>
                        <Menu.Item key="guonei">
                            <Icon type="appstore"/>国内
                        </Menu.Item>
                        <Menu.Item key="guoji">
                            <Icon type="appstore"/>国际
                        </Menu.Item>
                        <Menu.Item key="yule">
                            <Icon type="appstore"/>娱乐
                        </Menu.Item>
                        <Menu.Item key="tiyu">
                            <Icon type="appstore"/>体育
                        </Menu.Item>
                        <Menu.Item key="keji">
                            <Icon type="appstore"/>科技
                        </Menu.Item>
                        <Menu.Item key="shishang">
                            <Icon type="appstore"/>时尚
                        </Menu.Item>
                        {userShow}
                    </Menu>
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
                                        <Input type="password" placeholder="请再次输入您的密码" {...getFieldProps('r_confirmPassword')}/>
                                    </FormItem>
                                    <Button type="primary" htmlType="submit">注册</Button>
                                </Form>
                            </TabPane>
                        </Tabs>

                    </Modal>
                </Col>
                <Col span={2}></Col>
            </Row>
        </header>);
    };
}

export default PCHeader = Form.create({})(PCHeader);
