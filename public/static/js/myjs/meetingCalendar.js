
document.addEventListener('DOMContentLoaded', function () {
        let calendarEl = document.getElementById('calendar');
        let calendar = new FullCalendar.Calendar(calendarEl, {
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
            },
            buttonText: {
                today: '今天',
                month: '月',
                week: '周',
                day: '日'
            },
            locale: 'zh-cn', // 切换语言，当前为中文
            timeGridEventMinHeight: '20', // 设置事件的最小高度
            aspectRatio: 1.65, // 设置日历单元格宽度与高度的比例。
            initialView: 'dayGridMonth',
            initialDate: '2023-09-30',
            eventLimit: true, // 设置月日程，与all-day slot的最大显示数量，超过的通过弹窗显示
            navLinks: true, // can click day/week names to navigate views
            selectable: true,
            nowIndicator: true,
            dayMaxEvents: true, // allow "more" link when too many events
            editable: true,
            businessHours: true,
            eventLimitNum: { // 事件显示数量限制(本地测试未能生效)
                dayGrid: {
                    eventLimit: 5
                },
                timeGrid: {
                    eventLimit: 2 // adjust to 6 only for timeGridWeek/timeGridDay
                }
            },
            // 事件
            // eventClick: this.handleEventClick, // 点击日历日程事件
            eventDblClick: this.handleEventDblClick, // 双击日历日程事件 (这部分是在源码中添加的)
            eventClickDelete: this.eventClickDelete, // 点击删除标签事件 (这部分是在源码中添加的)
            eventDrop: this.eventDrop, // 拖动日历日程事件
            events: [{
                title: '德州收款会',
                start: '2023-10-08',
            },  {
                title: '烟台收款会',
                start: '2023-10-16',
            },{
                title: '青岛收款会',
                start: '2023-10-11',
            },{
                title: '临沂收款会',
                start: '2023-10-20',
            }, {
                title: '济南收款会',
                start: '2023-10-20',
            }, {
                title: '东营收款会',
                start: '2023-10-09',
                url: '',
            }, {
                title: '济宁收款会',
                start: '2023-10-19',

            }, {
                title: '潍坊收款会',
                start: '2023-10-15'
            },  {
                title: '菏泽收款会',
                start: '2023-10-07'
            },]
        });
        calendar.render();
    });

