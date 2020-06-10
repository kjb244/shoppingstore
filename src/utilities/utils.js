class utils {

    getCartData = () => {
        const cd = this.getCookie('cartData');
        if (cd === ''){
            return {};
        }
        return JSON.parse(cd);
    }

    setCartData = (cartData) => {
        this.setCookie('cartData', JSON.stringify(cartData), 30);
    }

    setCookie = (cname, cvalue, exdays) => {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        const expires = "expires="+d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    getCookie = (cname) =>{
        const name = cname + "=";
        const ca = document.cookie.split(';');
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }



}

const Utils = new utils();

export default Utils;