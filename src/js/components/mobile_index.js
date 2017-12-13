/**
 * @Date:   2017-12-05T13:41:48+08:00
 * @Email:  rosen_yang@sina.com
 * @Last modified time: 2017-12-05T14:38:57+08:00
 */
import React from 'react';
import MobileHeader from './mobiile_header';
import MobileFooter from './mobile_footer';
export default class MobileIndex extends React.Component {
    render() {
        return (<div>
            <MobileHeader></MobileHeader>
            <MobileFooter></MobileFooter>
        </div>);
    }
}
