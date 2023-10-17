export const emailBody = ({
  username,
  otp,
}: {
  username: string;
  otp: string;
}): string => {
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <meta name="x-apple-disable-message-reformatting" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap"
        rel="stylesheet"
      />
      <title></title>
      <!--[if mso]>
        <noscript>
          <xml>
            <o:OfficeDocumentSettings>
              <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
          </xml>
        </noscript>
      <![endif]-->
      <style>
        table,
        td,
        div,
        h1,
        p {
          font-family: "Montserrat", sans-serif;
        }
      </style>
    </head>
    <body
      style="
        overflow: hidden;
  
        height: 100vh;
      "
    >
      <table
        role="email"
        style="
          width: 100%;
          border-collapse: collapse;
          border: 0;
          background-image: url('https://imageupload.io/ib/K3wt2uldYnuuevK_1696433456.png');
          background-size: contain;
          background-color: #e4f1fb;
          border-spacing: 0;
          height: 100vh;
        "
      >
        <tr>
          <td align="center" style="padding: 100px 0 0 0; font-size: 3rem">
            Welcome ${username}!
          </td>
        </tr>
        <tr>
          <td
            align="center"
            style="
              padding: 0;
              font-size: 2rem;
              font-weight: bold;
              padding-top: 2rem;
            "
          >
            Verify your email address!
          </td>
        </tr>
        <tr>
          <td
            align="center"
            style="padding: 0; font-size: 1.5rem; padding-top: 1rem"
          >
            To verify your email address, please enter this<br />
            code in your browser
          </td>
        </tr>
        <tr>
          <td align="center" style="padding: 0; font-size: 3rem">
            <p
              style="
                background-color: #d9d9d9;
                width: fit-content;
                padding: 30px 10px 30px 20px;
                text-align: center;
                letter-spacing: 1.1rem;
                border-radius: 20px;
              "
            >
              ${otp}
            </p>
          </td>
        </tr>
        <tr>
          <td align="center" style="padding: 0; font-size: 1.5rem">
            <p style="width: 480px">
              If you didn’t request a code, you can safely ignore this email.
            </p>
          </td>
        </tr>
      </table>
    </body>
  </html>`;
};
