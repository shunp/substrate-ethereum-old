// use substrate_api_client::{Api};

use crate::config;
use std::sync::mpsc;
use std::sync::mpsc::channel;
use std::thread;

use substrate_api_client::{Api, node_metadata};

pub fn start(config: config::Config) -> thread::JoinHandle<()> {
    thread::Builder::new()
        .name("substrate_handler".to_string())
        .spawn(move || {
            let _ = thread::spawn(move || {
                log::info!("[substrate] hander start");
                let (events_in, events_out) = mpsc::channel();
                let event_subscriber =
                    start_event_subscriber(config.sub_api_url.clone(), events_in);
                let _ = event_subscriber.join();
            })
            .join();
        })
        .expect("cannot recognize substrate")
}

fn start_event_subscriber(
    api_url: String,
    events_in: mpsc::Sender<String>,
) -> thread::JoinHandle<()> {
    let mut sub_api = Api::new(api_url);
    log::info!("[substrate] starting subscriber of event_handler");
    thread::Builder::new()
        .name("event_subscriber".to_string())
        .spawn(move || {
            sub_api.subscribe_events(events_in.clone());
        })
        .expect("cannot start event_subscriber")
}

// use ws::{connect, Handler, Sender, HandShake, Result, Message};
// use node_primitives::Hash;
// use hex;
// use primitives::twox_128;
// use primitives::blake2_256;
// use serde_json::{json};

// // substrate_api_client
// pub struct Api {
//     url: String,
//     pub genesis_hash: Option<Hash>,
// }

// impl Api {
//     pub fn new(url: String) -> Api {
//         Api {
//             url: url,
//             genesis_hash: None,
//         }
//     }

//     pub fn init(&mut self) {
//         // TODO: get genesis hash
//         // TODO: get metadata
//         log::info!("init")
//     }

//     pub fn subscribe_events(&self, sender: mpsc::Sender<String>) {
//         log::info!("subscribe events...");
//         let key = storage_key_hash("System", "Events", None);
//         let jsonreq = json!({
//             "method": "state_subscribeStorage",
//             "params": [[key]],
//             "jsonrpc": "2.0",
//             "id": "1",
//         }).to_string();

//         let (result_in, result_out) = channel();
//         let _url = self.url.clone();
//         let _clinet = thread::Builder::new()
//             .name("client".to_string())
//             .spawn(move || {
//                 connect(_url, |out| {
//                     SubscriptionHandler {
//                         out: out,
//                         request: jsonreq.clone(),
//                         result: result_in.clone(),
//                     }
//                 }).unwrap()
//             })
//             .unwrap();

//         loop {
//             let res = result_out.recv().unwrap();
//             sender.send(res.clone()).unwrap();
//             println!("client >>>> got {}", res);
//         }
//     }
// }

// pub fn storage_key_hash(module: &str, storage_key_name: &str, param: Option<Vec<u8>>) -> String {
//     let mut key = modules.as_bytes().to_vec();
//     key.append(&mut vec!(' ' as u8));
//     key.append(&mut storage_key_name.as_bytes().to_vec());
//     let mut keyhash;
//     match param {
//         Some(par) => {
//             key.append(&mut par.clone());
//             keyhash = hex::encode(blake2_256(&key));
//         },
//         _ => {
//             keyhash = hex::encode(twox_128(&key));
//         },
//     }
//     keyhash.insert_str(0, "0x");
//     keyhash
// }

// struct SubscriptionHandler {
//     out: Sender,
//     request: String,
//     result: mpsc::Sender<String>,
// }

// impl Handler for SubscriptionHandler {
//     fn on_open(&mut self, _: Handshake) -> Result<()> {
//         log::info!("sending request: {}", self.request);
//         self.out.send(self.request.clone()).unwrap();
//         Ok(())
//     }
//     fn on_message(&mut self, msg: Message) -> Result<()> {
//         log::info!("got message");
//         log::debug!("{}", msg);
//         // TODO
//         Ok(())
//     }
// }