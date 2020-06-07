const express = require("express");
require("firebase/database");

const userService = require("../services/users");
const ResponseUtil = require("../utils/response");

/**
 * Create a new user and redirect to signin page
 * @param {express.Request} req
 * @param {express.Response} res
 */
const signupUser = (req, res) => {
  userService
    .createUser(req.body)
    .then((responseData) => ResponseUtil.sendResponse(res, responseData));
};

/**
 * Authenticates a user and responds with a token
 * @param {express.Request} req
 * @param {express.Response} res
 */
const signinUser = (req, res) => {
  userService
    .authenticateUser(req.body)
    .then((responseData) => ResponseUtil.sendResponse(res, responseData));
};

/**
 * Confirms user
 * @param {express.Request} req
 * @param {express.Response} res
 */
const confirmUser = (req, res) => {
  userService
    .confirmUser(req.body.token)
    .then((responseData) => ResponseUtil.sendResponse(res, responseData));
};

/**
 * Resends confirmation URL to user email
 * @param {express.Request} req
 * @param {express.Response} res
 */
const resendConfirmationURL = (req, res) => {
  userService
    .resendConfirmationURL(req.body.email)
    .then((responseData) => ResponseUtil.sendResponse(res, responseData));
};

/**
 * Resends confirmation URL to user email
 * @param {express.Request} req
 * @param {express.Response} res
 */
const sendPasswordResetURL = (req, res) => {
  userService
    .sendPasswordResetURL(req.body.email)
    .then((responseData) => ResponseUtil.sendResponse(res, responseData));
};

/**
 * Confirms the url sent for password reset
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const confirmPasswordResetURL = (req, res) => {
  userService
    .confirmPasswordResetURL(req.body.token)
    .then((responseData) => ResponseUtil.sendResponse(res, responseData));
};

/**
 * Resets user password
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const resetPassword = (req, res) => {
  const { token, password } = req.body;
  userService
    .resetPassword(token, password)
    .then((responseData) => ResponseUtil.sendResponse(res, responseData));
};

/**
 * Get all Users
 * @param {express.Request} req
 * @param {express.Response} res
 */
const getUsers = (req, res) => {
  userService
    .fetchUsers()
    .then((responseData) => ResponseUtil.sendResponse(res, responseData));
};

module.exports = {
  signupUser,
  signinUser,
  confirmUser,
  resendConfirmationURL,
  sendPasswordResetURL,
  confirmPasswordResetURL,
  resetPassword,
  getUsers,
};
