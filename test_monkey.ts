const req = {
  get body() {
    return { json: () => Promise.resolve({ success: true }) };
  }
};

const originalBody = req.body;
Object.defineProperty(req, 'body', {
  value: function(opts: any) {
    return {
      get value() {
        return originalBody.json();
      }
    };
  }
});

// simulate oak_graphql
const bodyRes = req.body({ type: 'json' });
bodyRes.value.then(console.log);
