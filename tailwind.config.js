// module.exports = {
//   future: {},
//   content: ["./src/**/*.{js,jsx,ts,tsx,vue}"],
//   theme: {
//     extend: {
//       backgroundColor: {
//         'logo-color-900': '#ffff',
//       },
//       fontSize: {
//         "2xs": "0.5rem",
//       },
//       maxWidth: {
//         "1/4": "25%",
//         "1/2": "50%",
//         "3/4": "75%",
//       },
//       maxHeight: {
//         review: "calc(100vh - 10rem)",
//       },
//       boxShadow: {
//         DEFAULT:
//           "0 2px 5px 0 rgba(60, 66, 87, 0.08), 0 0 0 1px rgba(60, 66, 87, 0.16), 0 1px 1px rgba(0, 0, 0, 0.12)",
//         error:
//           "0 2px 5px 0 rgba(255, 155, 155, 0.08), 0 0 0 1px rgba(255, 155, 155, 0.70), 0 1px 1px rgba(0, 0, 0, 0.12)",
//       },
//       colors: {
//         green: {
//           DEFAULT: "#56FBB1",
//         },
//         blue: {
//           DEFAULT: "#0A3149",
//         },
//         ui: {
//           light: "#F7F7FA",
//           DEFAULT: "#EEF0F5",
//           medium: "#D9DFE8",
//           dark: "#89959C",
//         },
//       },
//     },
//   },
//   plugins: [require("@tailwindcss/forms")],
// }
module.exports = {
  future: {},
  content: ["./src/**/*.{js,jsx,ts,tsx,vue}"],
  theme: {
    extend: {
      backgroundColor: {
        'logo-color-900': '#ffff',
      },
      fontSize: {
        "2xs": "0.5rem",
      },
      maxWidth: {
        "1/4": "25%",
        "1/2": "50%",
        "3/4": "75%",
      },
      maxHeight: {
        review: "calc(100vh - 10rem)",
      },
      boxShadow: {
        DEFAULT:
          "0 2px 5px 0 rgba(60, 66, 87, 0.08), 0 0 0 1px rgba(60, 66, 87, 0.16), 0 1px 1px rgba(0, 0, 0, 0.12)",
        error:
          "0 2px 5px 0 rgba(255, 155, 155, 0.08), 0 0 0 1px rgba(255, 155, 155, 0.70), 0 1px 1px rgba(0, 0, 0, 0.12)",
      },
      colors: {
        green: {
          DEFAULT: "#56FBB1",
        },
        blue: {
          DEFAULT: "#0A3149", // Add your custom blue color here
        },
        grey: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        ui: {
          light: "#F7F7FA",
          DEFAULT: "#EEF0F5",
          medium: "#D9DFE8",
          dark: "#89959C",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
