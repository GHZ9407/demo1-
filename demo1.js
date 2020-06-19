window.onload = function() {
    var vm = new Vue({
        el: '.container',
        data: {
            arr: {
                "unit1": [
                    { name: "xiaoming", id: 1, class: 300, grade: 80, object: "英语" },
                    { name: "lucy", id: 1, class: 300, grade: 80, object: "英语" },
                    { name: "jonh", id: 1, class: 300, grade: 80, object: "英语" },
                    { name: "dave", id: 1, class: 300, grade: 80, object: "英语" },
                    { name: "lucky", id: 1, class: 300, grade: 80, object: "英语" },
                    { name: "join", id: 1, class: 300, grade: 80, object: "英语" }
                ],
                "unit2": [
                    { name: "李四", id: 2, class: 300, grade: 80, object: "英语" },
                    { name: "李四", id: 2, class: 300, grade: 80, object: "英语" },
                    { name: "李四", id: 1, class: 300, grade: 80, object: "英语" }
                ],
                "高等数学": [
                    { name: "王五", id: 2, class: 300, grade: 80, object: "数学" },
                    { name: "王五", id: 2, class: 300, grade: 80, object: "数学" },
                    { name: "王五", id: 1, class: 300, grade: 80, object: "数学" }
                ]
            },
            path: [],
            list: [],
            all_list: [],
            number: 3,
            all_page: [],
            now_page: 1,
            change: true
        },
        created() {
            // this.number = document.getElementsByName('sel')[0].value;
            console.log(this.number);
            var end = this.number;
            this.all_list = this.arr['unit1'].concat(this.arr['unit2'], this.arr['高等数学']);
            this.list = this.all_list.slice(0, end);
            var leg = this.all_list.length / this.number;
            if ((this.all_list.length % this.number) != 0) {
                leg += 1;
            }
            for (var i = 1; i <= leg; i++) {
                this.all_page.push(i)
            }
        },
        mounted() {
            var lis = document.getElementsByClassName('page');
            lis[0].id = 'red';
        },
        methods: {
            click(num, event) {
                var e = event || (window.event);
                var el = e.target;
                var nextel = el.nextElementSibling;
                var name = el.tagName;
                console.log(name);
                if (name == 'SPAN') {
                    if (nextel.style.display == 'none') {
                        nextel.style.display = 'block';
                        el.className = 'el-icon-arrow-down';
                        this.path.splice(num)
                        this.path.push('> ' + el.innerText)
                    } else {
                        var val = '> ' + el.innerText;
                        this.path.forEach((item, index) => {
                            if (item == val) {
                                this.path.splice(index)
                            }
                        });
                        nextel.style.display = 'none';
                        el.className = 'el-icon-arrow-right';
                    }
                }
            },
            grade(event) {
                var e = event || (window.event);
                var el = e.target.innerText.trim();
                console.log(el)
                this.path.push('> ' + el);
                this.all_list = this.arr[el];
                this.all_page.splice(0);
                var leg = this.all_list.length / this.number;
                if ((this.all_list.length % this.number) != 0) {
                    leg += 1;
                }
                for (var i = 1; i <= leg; i++) {
                    this.all_page.push(i)
                }
                this.list = this.all_list.slice(0, this.number);
            },
            picture(num, event) {
                console.log(num)
                var e = event || (window.event);
                var lis = e.target.parentNode.children;
                console.log(lis)
                var img = document.getElementsByClassName('message')[0];
                var imgs = img.children;
                console.log(imgs);
                for (var i = 0; i < lis.length; i++) {
                    lis[i].id = '';
                    imgs[i].style.display = 'none';
                }
                e.target.id = 'underline';
                if (num == (imgs.length - 1)) {
                    imgs[num].style.display = 'table';
                } else {
                    imgs[num].style.display = 'block';
                }

            },
            page(event) {
                var e = event || (window.event);
                var p = e.target.innerText;
                var lis = e.target.parentNode.children;
                for (var i = 0; i < lis.length; i++) {
                    lis[i].id = ''
                }
                e.target.id = 'red'
                this.now_page = p;
                this.change = !this.change
                console.log(this.now_page);
            },
            last() {
                if (this.now_page != 1) {
                    this.now_page--;
                    this.change = !this.change
                    var el = document.getElementById('red');
                    el.id = '';
                    el.previousElementSibling.id = 'red';
                }

            },
            next() {
                var changdu = this.all_page.length;
                if (this.now_page != changdu) {
                    this.now_page++;
                    this.change = !this.change
                    var el = document.getElementById('red');
                    el.id = '';
                    el.nextElementSibling.id = 'red';
                }

            },
            topage() {
                var exp = /^\d+$/;
                var lis = document.getElementsByClassName('page');
                if (exp.test(this.now_page) && this.now_page <= lis.length) {
                    console.log(this.now_page);
                    var el = document.getElementById('red');
                    el.id = '';
                    console.log(lis);
                    for (var i = 0; i < lis.length; i++) {
                        if (lis[i].innerText == this.now_page) {
                            lis[i].id = 'red'
                        }
                    }
                    this.change = !this.change
                } else {
                    alert("请输入正确的格式！")
                }
            }
        },
        watch: {
            change: function() {
                var start = (this.now_page - 1) * this.number;
                var end = this.number * this.now_page;
                this.list = this.all_list.slice(start, end);
                console.log(this.list)
            },
            number: function() {
                var end = this.number;
                this.list = this.all_list.slice(0, end);
                var leg = this.all_list.length / this.number;
                if ((this.all_list.length % this.number) != 0) {
                    leg += 1;
                }
                this.all_page.splice(0);
                for (var i = 1; i <= leg; i++) {
                    this.all_page.push(i)
                }
                this.now_page = 1;
                var lis = document.getElementsByClassName('page');
                var el = document.getElementById('red');
                el.id = '';
                lis[0].id = 'red';
            }
        },
    })
}