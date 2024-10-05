export function formatPhoneNumber(phone: any): any {
    const cleanedPhone = phone?.replace(/\D/g, '');

    const formattedPhone = cleanedPhone?.replace(
        /(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/,
        '$1 $2 $3 $4 $5',
    );

    return formattedPhone;
}

