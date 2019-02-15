module.exports = {
  "parser": "babel-eslint",
  "extends": "airbnb",
  "env": {
    "browser": true,
    "es6": true,
    "jest": true,
    "node": true
  },
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "rules": {
    "camelcase": "off",
    "jsx-a11y/label-has-for": "off",
    "jsx-a11y/label-has-associated-control": "off",
    "import/no-named-as-default": "off",
    "import/no-named-as-default-member": "off",
    "arrow-body-style": "off",
    "arrow-parens": "off",
    "comma-dangle": "off",
    "no-mixed-operators": "off",
    "function-paren-newline": "off",
    "no-plusplus": "off",
    "object-curly-newline": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "jsx-a11y/no-noninteractive-element-interactions": "off",
    "jsx-a11y/anchor-is-valid": [ "error", {
      "components": [ "Link" ],
      "specialLink": [ "hrefLeft", "hrefRight" ],
      "aspects": [ "invalidHref", "preferButton" ]
    }],
    "react/jsx-tag-spacing": "off"
  }
}
