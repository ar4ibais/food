function openModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.querySelector('body').style.overflow = 'hidden';
}

function closeModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.querySelector('body').style.overflow = '';
    if (modalTimerId) {
        clearInterval(modalTimerId);
    }
}

const modal = (trigger, modalSelector, modalTimerId) => {
    // Modals

    const openBtns = document.querySelectorAll(trigger),
        modal = document.querySelector(modalSelector);


    openBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            openModal(modalSelector, modalTimerId);
        });
    });


    window.addEventListener('keydown', e => {
        if (modal.classList.contains('show') && e.code == 'Escape') {
            closeModal(modalSelector);
        }
    });

    modal.addEventListener('click', e => {
        const target = e.target;

        if (target.classList.contains('modal') || target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
        }
    });

    function showModalByScroll() {
        if (document.documentElement.scrollHeight <= document.documentElement.scrollTop + document.documentElement.clientHeight) {
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
}


export default modal;
export {openModal, closeModal};