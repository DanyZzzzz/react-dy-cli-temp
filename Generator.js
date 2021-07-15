const ora = require('ora');
const inquirer = require('inquirer');
const util = require('util');
const path = require('path');
const downloadGitRepo = require('download-git-repo'); // 不支持 Promise
const chalk = require('chalk');

// 添加加载动画
async function wrapLoading(fn, ...args) {
    // 开始加载动画
    var spinner = ora('正在下载中...').start();

    try {
        // 执行传入方法 fn
        const result = await fn(...args);
        // 状态为修改为成功
        spinner.text = '下载成功';
        spinner.color = '#13A10E';
        spinner.succeed();
        console.log('');
        // 提示进入下载的目录
        console.log(' 1、 进入项目目录');
        console.log(chalk.gray('   $ ') + chalk.blue(`cd ${this.name}`));
        console.log('');
        // 提示安装依赖
        console.log(' 2、 安装依赖');
        console.log(chalk.gray('   $ ') + chalk.blue(`npm install`) + chalk.gray('  or  ') + chalk.blue(`yarn`));
        console.log('');
        // 提示运行开发环境
        console.log(' 3、 运行开发环境指令');
        console.log(chalk.gray('   $ ') + chalk.blue(`npm run start`) + chalk.gray('  or  ') + chalk.blue(`yarn start`));
        console.log('');
        // 提示打包生产环境代码
        console.log(' 4、 打包生产环境指令');
        console.log(chalk.gray('   $ ') + chalk.blue(`npm run build`) + chalk.gray('  or  ') + chalk.blue(`yarn build`));
        console.log('');
        return result;
    } catch (error) {
        // 状态为修改为失败
        spinner.text = '下载失败';
        spinner.fail(); //下载失败
    }
}

class Generator {
    constructor(name, targetDir) {
        // 目录名称
        this.name = name;
        // 创建位置
        this.targetDir = targetDir;

        // 改造 download-git-repo 支持 promise
        this.downloadGitRepo = util.promisify(downloadGitRepo);
    }

    // 下载远程模板
    // 1）拼接下载地址
    // 2）调用下载方法
    async download() {
        // 1）拼接下载地址
        const requestUrl = 'direct:https://github.com/DanyZzzzz/react-webpack5-dy.git';

        // 2）调用下载方法
        await wrapLoading(
            this.downloadGitRepo, // 远程下载方法
            requestUrl, // 参数1: 下载地址
            path.resolve(process.cwd(), this.targetDir),
            { clone: true }
        ); // 参数2: 创建位置
    }

    // 核心创建逻辑
    // 1）获取模板名称
    // 2）获取 tag 名称
    // 3）下载模板到模板目录
    async create() {
        await this.download();
    }
}

module.exports = Generator;
