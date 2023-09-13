document.addEventListener('DOMContentLoaded', () => {

    const tabs = document.querySelectorAll('.tabheader__item')
    const tabsContent = document.querySelectorAll('.tabcontent')
    const tabsParent = document.querySelector('.tabheader__items')
    console.log(tabsParent)

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.style.display = 'none'
        })

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active')
        })
    }

    function showTabContent(i = 0) {
        tabsContent[i].style.display = 'block'
        tabs[i].classList.add('tabheader__item_active')
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (e) => {
        console.dir(e.target)
        const target = e.target
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            })
        }
    })

    // Timer

    const deadline = '2024-05-20'
    
    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date());
        const days = Math.floor(t / (1000 * 60 * 60 * 24))
        const hours = Math.floor ((t / (1000 * 60 * 60)) % 24)
        const minutes = Math.floor((t / (1000 * 60)) % 60)
        const seconds = Math.floor ((t / 1000) % 60)

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }
    }

    function addZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`
        } else {
            return num
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector);
        const days = timer.querySelector('#days')
        const hours = timer.querySelector('#hours')
        const minutes = timer.querySelector('#minutes')
        const seconds = timer.querySelector('#seconds')
        const timeInterval = setInterval(updateClock, 1000)
        
        updateClock()

        function updateClock() {
            const t = getTimeRemaining(endtime)
    
            days.innerHTML = addZero(t.days)
            hours.innerHTML = addZero(t.hours)
            minutes.innerHTML = addZero(t.minutes)
            seconds.innerHTML = addZero(t.seconds)

            if (t.total <= 0) {
                clearInterval(timeInterval)
            }
        }
    }

    setClock('.timer', deadline)

    // Modal

    const modalTrigger = document.querySelectorAll('[data-modal]')
    const modal = document.querySelector('.modal')
    const modalCloseBtn = document.querySelector('[data-close]')

    modalTrigger.forEach((btn) => {
        btn.addEventListener('click', () => {
            modal.style.display = 'block'
            modal.classList.add('show')
            document.body.style.overflow = 'hidden'
        })
    })

    function closeModal() {
        modal.style.display = 'none'
        document.body.style.overflow = ''
        modal.classList.remove('show')
    }

    modalCloseBtn.addEventListener('click', closeModal)

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal()
        }
    } )

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal()
        }
    })
})