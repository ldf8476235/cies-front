/*
 * @Author: your name
 * @Date: 2020-11-18 10:22:01
 * @LastEditTime: 2020-11-18 10:22:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ec_project\src\utils\request.js
 */
import axios from 'axios';

const http = axios.create({
    timeout: 10000,
    baseURL:"http://localhost/cies"
});

export default http