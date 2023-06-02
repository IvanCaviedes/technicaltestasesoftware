<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">

  <h3 align="center">Technical Test Asesoftware</h3>

  <p align="center">
    Development of a scheduling solution for businesses, allowing customers to book appointment slots in advance. Focus on efficient generation of appointments and management of business data, services, and availability.
    <br />
    <a href="https://github.com/othneildrew/Best-README-Template">View Demo</a>
    ·
    <a href="https://github.com/othneildrew/Best-README-Template/issues">Report Bug</a>
    ·
    <a href="https://github.com/othneildrew/Best-README-Template/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

There are many great README templates available on GitHub; however, I didn't find one that really suited my needs so I created this enhanced one. I want to create a README template so amazing that it'll be the last one you ever need -- I think this is it.

Here's why:

- Creating the table model in the SQL Server database.
- Developing a stored procedure that receives the following input parameters: a. Start date b. End date c. Service ID The stored procedure should query the service with the given ID to retrieve the opening and closing hours, as well as the duration of the service (in minutes). Based on this information, it should generate daily appointment slots from the start date to the end date. The appointment slots should align with the service duration, with the first slot starting at the service opening hour and subsequent slots following consecutively until the service closing hour. All generated appointment slots will be stored in the "turnos" table. The stored procedure should return the generated appointment slots.
- Creating a REST API using Node.js, along with a service for creating appointment slots. This service should receive the specified parameters and communicate with the stored procedure to generate the appointment slots
- Implementing business logic in the API to validate the correctness of parameters, such as invalid dates or incorrect ranges. The standard date format should be dd/mm/yyyy

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

The project has been created with the following technologies

- [![Nest][Nest.js]][Next-url]
- [![Jest][Jest.js]][Next-url]
- [![SQLSERVER][SQL.Server]][Next-url]
- [![Typescript][Typescript]][Next-url]
- [![VSCODE][VSCODE]][Next-url]
- [![ESLINT][ESLINT]][Next-url]
- [![PRETIER][PRETIER]][Next-url]
- [![GIT][GIT]][Next-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

- nodejs
- sql server

### Installation

follow the installation steps of the project

1. Clone the repo
   ```sh
   git clone https://github.com/IvanCaviedes/technicaltestasesoftware
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. correr el codigo sql en sql server el archivo esta ubicado en database/asesoftwaredb.sql
4. crear archivo .env como el de ejemplo con sus datos de conexion
5. correr test

```js
 npm run test
```

6. construir proyecto para producion

```js
 npm run build
```

7.Iniciar proyecto

```js
 npm run start:prod
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement". Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Usage

project screenshots [![Product Name Screen Shot][product-screenshot]](https://example.com) [![Product Name Screen Shot][product-screenshot2]]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contact

Project Link: [https://github.com/IvanCaviedes/technicaltestasesoftware](https://github.com/IvanCaviedes/technicaltestasesoftware)

linkedin : [https://www.linkedin.com/in/ivan-caviedes/](https://www.linkedin.com/in/ivan-caviedes/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/IvanCaviedes/technicaltestasesoftware/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/IvanCaviedes/technicaltestasesoftware/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/IvanCaviedes/technicaltestasesoftware/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/IvanCaviedes/technicaltestasesoftware/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/ivan-caviedes/
[product-screenshot]: docs/swagger.png
[product-screenshot2]: docs/Business.png
[product-screenshot3]: docs/swagger.png
[product-screenshot4]: docs/swagger.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com
[Nest.js]: https://img.shields.io/badge/nest-20232A?style=for-the-badge&logo=nestjs&logoColor=E0234E
[Jest.js]: https://img.shields.io/badge/Jest-323330?style=for-the-badge&logo=Jest&logoColor=white
[SQL.Server]: https://img.shields.io/badge/Microsoft_SQL_Server-CC2927?style=for-the-badge&logo=microsoft-sql-server&logoColor=white
[Typescript]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[VSCODE]: https://img.shields.io/badge/Visual_Studio_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white
[ESLINT]: https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white
[PRETIER]: https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3
[GIT]: https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white
