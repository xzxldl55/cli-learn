import blessed from 'blessed';

const screen = blessed.screen({
    fullUnicode: true
});

const table = blessed.table({
    parent: screen,
    width: '80%',
    height: 'shrink',
    top: 'center',
    left: 'center',
    border: {
        type: 'line'
    },
    data: null,
    align: 'center',
    tags: true,
    style: {
        border: {
            fg: 'white',
        },
        header: {
            fg: 'blue',
            bold: true,
        },
        cell: {
            fg: '#ff2649'
        }
    }
});

const data = [
    ['姓名', '工龄', '职位', '工资'],
    ['张三', '3年', '工程师', '10000'],
    ['李四', '5年', '经理', '20000'],
    ['王五', '2年', '助理', '5000'],
    ['赵六', '1年', '实习生', '3000'],
];

data[1][0] = `{red-fg}${data[1][0]}{/red-fg}`;

table.setData(data);

screen.key('C-c', () => {
    screen.destroy();
});

screen.render();