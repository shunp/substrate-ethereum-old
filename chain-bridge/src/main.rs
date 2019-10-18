use dotenv::dotenv;
use env_logger;
use std::env;

mod config;
mod substrate_handler;

fn main() {
    env::set_var("RUST_LOG", "info");
    env_logger::init();
    dotenv().ok();

    let config = config::Config::load().expect("cannot load config");
    log::info!("[ethereum] api url: {:?}", config.eth_api_url);
    log::info!("[substrate] api url: {:?}", config.sub_api_url);
    substrate_handler::start(config.clone());
}
