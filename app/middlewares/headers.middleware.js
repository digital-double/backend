exports.setHeaders = (_req, res, next) => {
    res.set({
      'Report-To':
        "{'group': 'csp-endpoint','max_age': 10886400,'url': 'https://digitaldouble.com/csp-reports'}",
      'Content-Security-Policy':
        "default-src 'self'; report-uri https://digitaldouble.com/csp-reports; report-to csp-endpoint",
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
      'X-Frame-Options': 'deny',
      'X-Content-Type-Options': 'nosniff',
      'X-Permitted-Cross-Domain-Policies': 'none',
      'Referrer-Policy': 'no-referrer',
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'X-XSS-Protection': '1; mode=block',
    });
    return next();
  };