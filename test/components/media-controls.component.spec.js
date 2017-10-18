import React from 'react';
import { mount } from 'enzyme';
import MediaControls from '../../app/components/common/MediaControls/media-controls';

const selectors = {
  forward_btn: '.pt-icon-step-forward',
  pause_btn: '.pt-icon-pause',
  play_btn: '.pt-icon-play',
  redo_btn: '.pt-icon-redo',
};

describe('Media Controls', () => {
  let wrapper;

  beforeEach(() => {
    const props = {
      compact: false,
      currentRound: 1,
      currentPhase: 0,
      isPlaying: false,
      totalRounds: 12,
      openGeneralAlert: jest.fn(),
      pause: jest.fn(() => wrapper.setProps({ isPlaying: false })),
      resetTimer: jest.fn(),
      resume: jest.fn(() => wrapper.setProps({ isPlaying: true })),
      skip: jest.fn(),
    };

    wrapper = mount(<MediaControls {...props} />);
  });

  it('should display three buttons', () => {
    expect(wrapper.find('button').length).toBe(3);
  });

  describe('Initial State', () => {
    it('should display redo icon', () => {
      const { redo_btn } = selectors;
      expect(wrapper.find(redo_btn).length).toBe(1);
    });

    it('should display play icon', () => {
      const { play_btn } = selectors;
      expect(wrapper.props().isPlaying).toBe(false);
      expect(wrapper.find(play_btn).length).toBe(1);
    });

    it('should display forward icon', () => {
      const { forward_btn } = selectors;
      expect(wrapper.find(forward_btn).length).toBe(1);
    });
  });

  describe('Redo button', () => {
    it('should call open general alerts after redo button is clicked', () => {
      const { redo_btn } = selectors;
      wrapper.find(redo_btn).simulate('click');
      expect(wrapper.props().openGeneralAlert).toHaveBeenCalled();
    });
  });

  describe('Pause and play buttons', () => {
    it('should show pause button after clicking play button', () => {
      const { pause_btn, play_btn } = selectors;
      wrapper.find(play_btn).simulate('click');
      expect(wrapper.props().resume).toHaveBeenCalled();
      expect(wrapper.find(pause_btn).length).toBe(1);
    });

    it('should show play button after clicking pause button', () => {
      const { pause_btn, play_btn } = selectors;
      wrapper.setProps({ isPlaying: true });
      wrapper.find(pause_btn).simulate('click');
      expect(wrapper.props().pause).toHaveBeenCalled();
      expect(wrapper.find(play_btn).length).toBe(1);
    });
  });

  describe('Skip to next phase button', () => {
    it('should dispatch skip when clicked', () => {
      const { forward_btn } = selectors;
      wrapper.find(forward_btn).simulate('click');
      expect(wrapper.props().skip).toHaveBeenCalled();
    });
  });
});
