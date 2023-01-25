// file system module to perform file operations
const fs = require('fs');
require('dotenv').config();
let  http = require('https')
if(process.env.ENVIRONMENT === 'local'){
  http = require('http');
}


if (process.env.ENVIRONMENT === 'local') {
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
}

function extractHostname(url) {
	let hostname;
	// find & remove protocol (http, ftp, etc.) and get hostname

	if (url.includes('//')) {
		hostname = url.split('/')[2];
	}
	else {
		hostname = url.split('/')[0];
	}

	// find & remove port number
	hostname = hostname.split(':')[0];
	// find & remove "?"
	hostname = hostname.split('?')[0];

	return hostname;
}

/**
 * @desc Get get all routes
 */
http.get({
	host: extractHostname(process.env.BASE_URL),
	port: process.env.BASE_PORT || '80',
	path: '/api/v1/website/routes',
	headers: {
		'x-gsr-source': 'website',
	},
}, (resp) => {
	let data = '';

	// A chunk of data has been recieved.
	resp.on('data', (chunk) => {
		data += chunk;
	});

	// The whole response has been received. Print out the result.
	resp.on('end', () => {
		const jsonObj = JSON.parse(data);

		// stringify JSON Object
		const jsonContent = JSON.stringify(jsonObj.data);
		// console.log(jsonContent);

		fs.writeFile('api_routes.json', jsonContent, 'utf8', function (err) {
			if (err) {
				console.log('An error occurred while writing JSON Object to File.');
				return console.log(err);
			}

			console.log('api_routes.json JSON file has been saved.');
		});
	});
}).on('error', (err) => {
  console.error(extractHostname(process.env.BASE_URL))
	console.log('Error: ' + err.message);
});

/**
 * Get destinations routes
 */
http.get({
  host: extractHostname(process.env.BASE_URL),
  port: process.env.BASE_PORT || '80',
  path: '/api/v1/website/destinations',
  headers: {
    'x-gsr-source': 'website',
  },
}, (resp) => {
  let data = '';

  // A chunk of data has been received.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    const jsonObj = JSON.parse(data);
    const jsonContent = JSON.stringify(jsonObj.data);
    fs.writeFile('api_destinations.json', jsonContent, 'utf8', function (err) {
      if (err) {
        console.log('An error occurred while writing JSON Object to File.');
        return console.log(err);
      }

      console.log('api_destinations.json JSON file has been saved.');
    });
  });
}).on('error', (err) => {
  console.log('Error: ' + err.message);
});

/**
 * Get footer destinations routes
 */
http.get({
  host: extractHostname(process.env.BASE_URL),
  port: process.env.BASE_PORT || '80',
  path: '/api/v1/website/footer-destinations',
  headers: {
    'x-gsr-source': 'website',
  },
}, (resp) => {
  let data = '';

  // A chunk of data has been received.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    const jsonObj = JSON.parse(data);
    const jsonContent = JSON.stringify(jsonObj.data);
    fs.writeFile('api_footer_destinations.json', jsonContent, 'utf8', function (err) {
      if (err) {
        console.log('An error occurred while writing JSON Object to File.');
        return console.log(err);
      }

      console.log('api_footer_destinations.json JSON file has been saved.');
    });
  });
}).on('error', (err) => {
  console.log('Error: ' + err.message);
});

/**
 * Get footer data routes
 */
http.get({
  host: extractHostname(process.env.BASE_URL),
  port: process.env.BASE_PORT || '80',
  path: '/api/v1/website/footer-data',
  headers: {
    'x-gsr-source': 'website',
  },
}, (resp) => {
  let data = '';

  // A chunk of data has been received.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    const jsonObj = JSON.parse(data);
    const jsonContent = JSON.stringify(jsonObj.data);
    fs.writeFile('api_footer_data.json', jsonContent, 'utf8', function (err) {
      if (err) {
        console.log('An error occurred while writing JSON Object to File.');
        return console.log(err);
      }

      console.log('api_footer_data.json JSON file has been saved.');
    });
  });
}).on('error', (err) => {
  console.log('Error: ' + err.message);
});

/**
 * Get metas
 */
http.get({
  host: extractHostname(process.env.BASE_URL),
  port: process.env.BASE_PORT || '80',
  path: '/api/v1/website/metas',
  headers: {
    'x-gsr-source': 'website',
  },
}, (resp) => {
  let data = '';

  // A chunk of data has been received.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    const jsonObj = JSON.parse(data);
    const jsonContent = JSON.stringify(jsonObj.data);
    fs.writeFile('api_metas.json', jsonContent, 'utf8', function (err) {
      if (err) {
        console.log('An error occurred while writing JSON Object to File.');
        return console.log(err);
      }

      console.log('api_metas.json JSON file has been saved.');
    });
  });
}).on('error', (err) => {
  console.log('Error: ' + err.message);
});

/**
 * Get sitemap
 */
http.get({
  host: extractHostname(process.env.BASE_URL),
  port: process.env.BASE_PORT || '80',
  path: '/api/v1/website/sitemap',
  headers: {
    'x-gsr-source': 'website',
  },
}, (resp) => {
  let data = '';

  // A chunk of data has been received.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    const jsonObj = JSON.parse(data);
    const jsonContent = JSON.stringify(jsonObj.data);
    fs.writeFile('api_sitemap.json', jsonContent, 'utf8', function (err) {
      if (err) {
        console.log('An error occurred while writing JSON Object to File.');
        return console.log(err);
      }

      console.log('api_sitemap.json JSON file has been saved.');
    });
  });
}).on('error', (err) => {
  console.log('Error: ' + err.message);
});

/**
 * Get countries
 */
http.get({
  host: extractHostname(process.env.BASE_URL),
  port: process.env.BASE_PORT || '80',
  path: '/api/v1/website/countries',
  headers: {
    'x-gsr-source': 'website',
  },
}, (resp) => {
  let data = '';

  // A chunk of data has been received.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    const jsonObj = JSON.parse(data);
    const jsonContent = JSON.stringify(jsonObj.data);
    fs.writeFile('api_countries.json', jsonContent, 'utf8', function (err) {
      if (err) {
        console.log('An error occurred while writing JSON Object to File.');
        return console.log(err);
      }

      console.log('api_countries.json JSON file has been saved.');
    });
  });
}).on('error', (err) => {
  console.log('Error: ' + err.message);
});

/**
 * Get redirects
 */
http.get({
  host: extractHostname(process.env.BASE_URL),
  port: process.env.BASE_PORT || '80',
  path: '/api/v1/website/redirects',
  headers: {
    'x-gsr-source': 'website',
  },
}, (resp) => {
  let data = '';

  // A chunk of data has been received.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    const jsonObj = JSON.parse(data);
    const jsonContent = JSON.stringify(jsonObj.data);
    fs.writeFile('api_redirects.json', jsonContent, 'utf8', function (err) {
      if (err) {
        console.log('An error occurred while writing JSON Object to File.');
        return console.log(err);
      }

      console.log('api_redirects.json JSON file has been saved.');
    });
  });
}).on('error', (err) => {
  console.log('Error: ' + err.message);
});
