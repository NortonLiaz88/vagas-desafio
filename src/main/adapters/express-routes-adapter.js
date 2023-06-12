const adapRoute = (controller) => {
  return async (req, res) => {
    const httpRequest = {
      body: req.body,
      params: req.params,
      accountId: req.accountId,
      query: req.query,
    }
    
    const apiHandle = controller?.handle ? controller.handle : controller;
    
    const httpResponse = await apiHandle(httpRequest)
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      res.status(httpResponse.statusCode).json(httpResponse.body);
    } else {
      res.status(httpResponse.statusCode).json({ error: httpResponse.body.message });
    }
  }
}

module.exports = {
  adapRoute
}
