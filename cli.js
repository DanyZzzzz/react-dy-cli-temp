#!/usr/bin/env node
// 使用node开发命令行工具所执行的js脚本必须在顶部加入 #!/usr/bin/env node 生命
// #!/usr/bin/env node  告诉系统该脚本使用node运行，用户必须在系统变量中配置了node

const path = require('path');

const program = require('commander');

// 给字体增加颜色
const chalk = require('chalk');

const fs = require('fs');

// 模板下载地址

/**
 * 使用package.json中的版本信息
 */
function getPackageVersion() {
    const pkgPath = path.join(__dirname, './package.json');
    const pkgData = JSON.parse(fs.readFileSync(pkgPath));
    return pkgData.version;
}

// 设置脚手架版本
program.version(getPackageVersion(), '-v, --version');
program.on('--help', () => {
    console.log(
        '\r\n' +
            figlet.textSync('Dy', {
                font: 'Ghost',
                horizontalLayout: 'default',
                verticalLayout: 'default',
                width: 80,
                whitespaceBreak: true,
            })
    );
    console.log(`\r\nRun ${chalk.cyan(`zr <command> --help`)} for detailed usage of given command\r\n`);
});
// 跟用户进行交互
program
    // react-dy-cli create demoname
    .command('create <project>')
    // 添加描述
    .description('初始化项目模板')
    .action(function (projectName, options) {
        require('./create.js')(projectName, options);
    });

// 解析命令行参数
program.parse(process.argv);
