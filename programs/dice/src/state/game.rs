use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct Game {
    
    pub dice_max: u16,
    pub dice_edge: u16,

}
