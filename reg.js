import React from "react";



class Reg extends React.Component {
    //-----------------------------------------视图
    render() {
        return (
            <div>
                <from action ="#" method="post">
                <label>账号：</label>
                <input type="text" />
                <br />
                <label>密码：</label>
                <input type="text" />
                <br />
                <label>邮箱：</label>
                <input type="text" />
                <br />
                <input type="button" value="注册" />
                </from>
            </div>
        )

    }
}



export default Reg