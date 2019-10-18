use std::env;

#[derive(Clone, Debug)]
pub struct Config {
    pub eth_api_url: String,
    pub sub_api_url: String,
}

impl Config {
    pub fn load() -> Result<Self, &'static str> {
        Ok(Config {
            eth_api_url: parse_eth_api_url()?,
            sub_api_url: parse_sub_api_url()?,
        })
    }
}

fn parse_eth_api_url() -> Result<String, &'static str> {
    env::var("ETH_API_URL").map_err(|_| "can not read ETH_URL_API")
}

fn parse_sub_api_url() -> Result<String, &'static str> {
    env::var("SUB_API_URL").map_err(|_| "can not read SUB_URL_API")
}