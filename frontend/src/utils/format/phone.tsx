export const formatPhone = (phone: string) =>{
    if(phone.length === 11){
        const splitPhone = phone.split("");
        const phoneFormat = `(${splitPhone[0]}${splitPhone[1]})
        ${splitPhone[2]}.${splitPhone[3]}${splitPhone[4]}${splitPhone[5]}${splitPhone[6]}-${splitPhone[7]}${splitPhone[8]}${splitPhone[9]}${splitPhone[10]}
        `
        return phoneFormat;
    }
    if(phone.length === 13){
        const splitPhone = phone.split("");
        const phoneFormat = `+${splitPhone[0]}${splitPhone[1]}
        (${splitPhone[2]}${splitPhone[3]})
        ${splitPhone[4]}.${splitPhone[5]}${splitPhone[6]}${splitPhone[7]}${splitPhone[8]}-${splitPhone[9]}${splitPhone[10]}${splitPhone[11]}${splitPhone[12]}
        `
        return phoneFormat;
    }
    return "Sem Telefone"
}

export const maskPhone = (phone: string): string => {
    phone = phone.replace(/\D/g, '');

    if (phone.length > 11) {
        phone = phone.slice(0, 11);
    }

    if (phone.length === 11) {
        return `(${phone.slice(0, 2)}) ${phone.slice(2, 3)} ${phone.slice(3, 7)}-${phone.slice(7)}`;
    }

    if (phone.length === 10) {
        return `(${phone.slice(0, 2)}) ${phone.slice(2, 6)}-${phone.slice(6)}`;
    }

    if (phone.length === 9) {
        return `${phone.slice(0, 1)} ${phone.slice(1, 5)}-${phone.slice(5)}`;
    }

    if (phone.length === 8) {
        return `${phone.slice(0, 4)}-${phone.slice(4)}`;
    }

    return phone;
};

export const unmaskPhone = (phone: string): string => {
    return phone.replace(/\D/g, '');
};