package com.example.app.dao;

import com.example.app.dto.UserDTO;
import com.example.app.vao.User;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class UserControllerTest {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private com.example.app.rest.UserController userController;

    @BeforeEach
    void setUp() {
        userRepository.deleteAll();
    }

    @Test
    void testCreateUser() {
        UserDTO userDTO = new UserDTO();
        userDTO.setUsername("test_user");
        userDTO.setEmail("test_user@example.com");
        userDTO.setPassword("secure_password");

        User createdUser = userController.createUser(userDTO);

        Assertions.assertNotNull(createdUser.getId());
        assertEquals("test_user", createdUser.getUsername());
        assertEquals("test_user@example.com", createdUser.getEmail());
        assertEquals("secure_password", createdUser.getPassword());
    }

    @Test
    void testUpdateUser() {
        User user = User.builder()
                .username("original_user")
                .email("original@example.com")
                .password("original_password")
                .build();
        user = userRepository.save(user);

        UserDTO userDTO = new UserDTO();
        userDTO.setUsername("updated_user");

        User updatedUser = userController.updateUser(user.getId(), userDTO);

        assertEquals("updated_user", updatedUser.getUsername());
        assertEquals("original@example.com", updatedUser.getEmail());
    }

    @Test
    void testDeleteUser() {
        User user = User.builder()
                .username("delete_user")
                .email("delete_user@example.com")
                .password("delete_password")
                .build();
        user = userRepository.save(user);

        Assertions.assertTrue(userRepository.existsById(user.getId()));

        userController.deleteUser(user.getId());

        Assertions.assertFalse(userRepository.existsById(user.getId()));
    }

    @Test
    void testGetAllUsers() {
        userRepository.save(User.builder()
                .username("user1")
                .email("user1@example.com")
                .password("pass1")
                .build());
        userRepository.save(User.builder()
                .username("user2")
                .email("user2@example.com")
                .password("pass2")
                .build());

        Iterable<User> users = userController.getAllUsers();

        Assertions.assertTrue(users.iterator().hasNext());
        assertEquals(2, userRepository.count());
    }

    @RepeatedTest(3)
    @DisplayName("Repeated Test for User Count")
    void testUserCountRepeatedly() {
        userRepository.save(User.builder()
                .username("user_repeated")
                .email("user_repeated@example.com")
                .password("secure_password")
                .build());
        assertEquals(1, userRepository.count(), "The user count should always be 1.");
    }
}