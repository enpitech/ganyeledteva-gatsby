module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ["airbnb", "prettier", "plugin:react-hooks/recommended"],
  plugins: ["react", "prettier", "react-hooks"],
  rules: { "react/prop-types": 0 },
    "settings": {
      "import/resolver": {
        "alias": {'map':[
            ["~static", "./static"],
            ["~src", "./src"]
          
        ],
        "extensions": [".js", ".jsx"]}

      }
    }
  
};
