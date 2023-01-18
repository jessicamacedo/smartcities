exports.GetLanguage = (userLanguage)=>{
    console.log(userLanguage)
    const locale = ((Intl.DateTimeFormat().resolvedOptions().locale).split('-')[0]).toLowerCase();
   // console.log(locale.toLowerCase());

    var translationsJson =  userLanguage === 'pt' ? require('../translations/pt') :
                            userLanguage === 'en' ? require('../translations/en') : 
                            locale === 'pt' ? require('../translations/pt') :
                            require('../translations/en')
    
    //console.log('translationsJson: ' + JSON.stringify(translationsJson))
    return translationsJson;
}