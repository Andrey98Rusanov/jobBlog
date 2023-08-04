import { Component } from "react";

export default class Api extends Component {
  token = window.localStorage.getItem("token");
  async getArticles(page) {
    const propmiseArticles = await fetch(
      `https://blog.kata.academy/api/articles?limit=5&offset=${page * 5 - 5}`,
    );
    const articles = await propmiseArticles.json();
    return articles;
  }

  async getArticle(slug) {
    const articlePromise = await fetch(
      `https://blog.kata.academy/api/articles/${slug}`,
    );
    const article = await articlePromise.json();
    return article;
  }

  async createUser(newUser) {
    const response = await fetch(`https://blog.kata.academy/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ user: newUser }),
    });
    const data = await response.json();
    if (!response.ok) {
      alert(JSON.stringify(data.errors));
    } else {
      window.localStorage.setItem("token", data.user.token);
      console.log(window.localStorage.getItem("token"));
    }
    return data;
  }

  async logIn(loginData) {
    const response = await fetch(`https://blog.kata.academy/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ user: loginData }),
    });
    const data = await response.json();
    if (!response.ok) {
      alert(JSON.stringify(data.errors));
    } else {
      window.localStorage.setItem("token", data.user.token);
      console.log(window.localStorage.getItem("token"));
    }
    return data;
  }

  async getCurrentUser() {
    if (this.token) {
      const response = await fetch(`https://blog.kata.academy/api/user`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });
      const data = await response.json();
      return data;
    }
  }

  async createArticle(articleData) {
    const response = await fetch(`https://blog.kata.academy/api/articles`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: `Bearer ${this.token}`,
        },
        body: JSON.stringify({ article: articleData }),
    });

    const data = await response.json();

    return data;
}

async editUserAccount(newUserData) {
  const response = await fetch(`https://blog.kata.academy/api/user`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify({ user: newUserData }),
  });
  const data = await response.json();
  return data;
}
}
