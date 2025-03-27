use anchor_lang::prelude::*;
 
#[error_code]
pub enum GameError {
    #[msg("Unauthorized")]
    Unauthorized,
    #[msg("Game has paused")]
    GameHasPaused,
}
