/***
 *  Jéssica Macedo 
 *  Last modified 21/01/2023
 */

exports.GetLanguage = (userLanguage) => {
    //console.log(userLanguage)

    //Get language default from server
    const locale = ((Intl.DateTimeFormat().resolvedOptions().locale).split('-')[0]).toLowerCase();
    // console.log(locale);

    //First it chooses the user language choice,
    //If the user dont choose any language default it returns the server configured language
    //If any of the options were available it chooses en (english) as default
    var translationsJson = userLanguage === 'pt' ? require('../translations/pt') :
        userLanguage === 'en' ? require('../translations/en') :
            locale === 'pt' ? require('../translations/pt') :
                require('../translations/en')

    //console.log('translationsJson: ' + JSON.stringify(translationsJson))
    return translationsJson;
}